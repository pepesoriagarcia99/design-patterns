package io.r2dbc.pool;

import io.r2dbc.spi.ConnectionFactory;
import java.time.Duration;

public final class ConnectionFactoryOptions {

    // Constantes predefinidas para las opciones conocidas
    public static final Option<String> DRIVER = Option.valueOf("driver");
    public static final Option<String> PROTOCOL = Option.valueOf("protocol");
    public static final Option<String> HOST = Option.valueOf("host");
    public static final Option<Integer> PORT = Option.valueOf("port");
    public static final Option<String> USER = Option.valueOf("user");
    public static final Option<CharSequence> PASSWORD = Option.valueOf("password");
    public static final Option<String> DATABASE = Option.valueOf("database");
    public static final Option<Duration> CONNECT_TIMEOUT = Option.valueOf("connectTimeout");
    public static final Option<Boolean> SSL = Option.valueOf("ssl");

    // Almacena todas las opciones en un Map inmutable
    private final Map<Option<?>, Object> options;

    private ConnectionFactoryOptions(Map<Option<?>, Object> options) {
        this.options = Collections.unmodifiableMap(new HashMap<>(options));
    }

    // Obtiene un valor (puede ser null)
    @SuppressWarnings("unchecked")
    public <T> T getValue(Option<T> option) {
        return (T) this.options.get(option);
    }

    // Obtiene un valor obligatorio (lanza excepción si no existe)
    public <T> T getRequiredValue(Option<T> option) {
        T value = getValue(option);
        if (value == null) {
            throw new IllegalStateException(
                String.format("No value found for option '%s'", option.name()));
        }
        return value;
    }

    public boolean hasOption(Option<?> option) {
        return this.options.containsKey(option);
    }

    // Parsea una URL R2DBC → ConnectionFactoryOptions
    // ej: r2dbc:postgresql://user:pass@localhost:5432/mydb
    public static ConnectionFactoryOptions parse(String url) {
        // Descompone la URL y mapea cada parte a su Option correspondiente
        // r2dbc:<driver>://<user>:<password>@<host>:<port>/<database>
        // ... lógica de parseo ...
    }

    // Crea un Builder nuevo
    public static Builder builder() {
        return new Builder();
    }

    // Crea un Builder a partir de opciones existentes (para modificar)
    public static Builder builder(ConnectionFactoryOptions connectionFactoryOptions) {
        return new Builder(connectionFactoryOptions.options);
    }

    public static final class Builder {

        private final Map<Option<?>, Object> options = new HashMap<>();

        private Builder() {}

        private Builder(Map<Option<?>, Object> options) {
            this.options.putAll(options);
        }

        // Método genérico para setear cualquier opción
        public <T> Builder option(Option<T> option, T value) {
            this.options.put(option, value);
            return this;
        }

        public ConnectionFactoryOptions build() {
            return new ConnectionFactoryOptions(this.options);
        }
    }
}

public final class ConnectionFactories {

    private ConnectionFactories() {}

    public static ConnectionFactory get(ConnectionFactoryOptions connectionFactoryOptions) {
        // Usa Java SPI (ServiceLoader) para descubrir proveedores
        for (ConnectionFactoryProvider provider : loadProviders()) {
            if (provider.supports(connectionFactoryOptions)) {
                return provider.create(connectionFactoryOptions);
            }
        }

        throw new IllegalStateException(
            String.format("Unable to create a ConnectionFactory for '%s'. " +
                "Available drivers: [ %s ]",
                connectionFactoryOptions.getRequiredValue(ConnectionFactoryOptions.DRIVER),
                getAvailableDrivers()));
    }

    // Sobrecarga que acepta un URL tipo: r2dbc:postgresql://user:pass@localhost/mydb
    public static ConnectionFactory get(String url) {
        return get(ConnectionFactoryOptions.parse(url));
    }

    private static List<ConnectionFactoryProvider> loadProviders() {
        return ServiceLoader.load(ConnectionFactoryProvider.class)
            .stream()
            .map(ServiceLoader.Provider::get)
            .collect(Collectors.toList());
    }

    private static String getAvailableDrivers() {
        return loadProviders().stream()
            .map(provider -> provider.getDriver())
            .collect(Collectors.joining(", "));
    }
}

public final class ConnectionPoolConfiguration {

    private final ConnectionFactory connectionFactory;
    private final int maxSize;
    private final int initialSize;
    private final Duration maxIdleTime;
    private final Duration maxLifeTime;
    private final Duration acquireRetry;
    private final String validationQuery;

    private ConnectionPoolConfiguration(Builder builder) {
        this.connectionFactory = builder.connectionFactory;
        this.maxSize = builder.maxSize;
        this.initialSize = builder.initialSize;
        this.maxIdleTime = builder.maxIdleTime;
        this.maxLifeTime = builder.maxLifeTime;
        this.acquireRetry = builder.acquireRetry;
        this.validationQuery = builder.validationQuery;
    }

    public ConnectionFactory getConnectionFactory() {
        return connectionFactory;
    }

    public int getMaxSize() {
        return maxSize;
    }

    public int getInitialSize() {
        return initialSize;
    }

    public Duration getMaxIdleTime() {
        return maxIdleTime;
    }

    public Duration getMaxLifeTime() {
        return maxLifeTime;
    }

    public Duration getAcquireRetry() {
        return acquireRetry;
    }

    public String getValidationQuery() {
        return validationQuery;
    }

    // Builder
    public static Builder builder(ConnectionFactory connectionFactory) {
        return new Builder(connectionFactory);
    }

    public static final class Builder {

        private final ConnectionFactory connectionFactory;
        private int maxSize = 10;
        private int initialSize = 10;
        private Duration maxIdleTime = Duration.ofMinutes(30);
        private Duration maxLifeTime = Duration.ofHours(1);
        private Duration acquireRetry = Duration.ofSeconds(1);
        private String validationQuery;

        private Builder(ConnectionFactory connectionFactory) {
            this.connectionFactory = connectionFactory;
        }

        public Builder maxSize(int maxSize) {
            this.maxSize = maxSize;
            return this;
        }

        public Builder initialSize(int initialSize) {
            this.initialSize = initialSize;
            return this;
        }

        public Builder maxIdleTime(Duration maxIdleTime) {
            this.maxIdleTime = maxIdleTime;
            return this;
        }

        public Builder maxLifeTime(Duration maxLifeTime) {
            this.maxLifeTime = maxLifeTime;
            return this;
        }

        public Builder acquireRetry(Duration acquireRetry) {
            this.acquireRetry = acquireRetry;
            return this;
        }

        public Builder validationQuery(String validationQuery) {
            this.validationQuery = validationQuery;
            return this;
        }

        public ConnectionPoolConfiguration build() {
            return new ConnectionPoolConfiguration(this);
        }
    }
}

public class ConnectionPool implements ConnectionFactory, Disposable, Closeable {

    private final ConnectionFactory factory;
    private final ConnectionPoolConfiguration configuration;

    // El pool reactivo interno (de Project Reactor)
    private final InstrumentedPool<Connection> connectionPool;

    public ConnectionPool(ConnectionPoolConfiguration configuration) {
        this.configuration = configuration;
        this.factory = configuration.getConnectionFactory();

        // Construye el pool reactivo usando la config
        this.connectionPool = PoolBuilder
            // Qué hacer cuando se necesita una conexión nueva:
            .from(Mono.defer(() -> Mono.from(factory.create())))
            // Qué hacer cuando se destruye una conexión:
            .destroyHandler(connection -> Mono.from(connection.close()))
            // Validación antes de entregar una conexión del pool:
            .evictionPredicate((connection, metadata) -> {
                // Descartar si superó maxIdleTime
                if (metadata.idleTime().compareTo(configuration.getMaxIdleTime()) >= 0) {
                    return true;
                }
                // Descartar si superó maxLifeTime
                if (metadata.lifeTime().compareTo(configuration.getMaxLifeTime()) >= 0) {
                    return true;
                }
                return false;
            })
            .maxPendingAcquireUnbounded()
            .sizeMax(configuration.getMaxSize())
            .sizeInitial(configuration.getInitialSize())
            .buildPool();
    }

    // --- Implementa ConnectionFactory ---
    // Cuando alguien pide una conexión, la saca del pool (no crea una nueva)
    @Override
    public Publisher<? extends Connection> create() {
        return connectionPool.acquire()
            .map(pooledRef -> {
                Connection connection = pooledRef.poolable();
                // Envuelve la conexión para que close() la devuelva al pool
                // en vez de cerrarla de verdad
                return new PooledConnection(connection, pooledRef);
            });
    }

    @Override
    public ConnectionFactoryMetadata getMetadata() {
        return factory.getMetadata();
    }

    // --- Gestión del ciclo de vida ---
    @Override
    public void dispose() {
        connectionPool.dispose();
    }

    @Override
    public boolean isDisposed() {
        return connectionPool.isDisposed();
    }

    @Override
    public void close() {
        dispose();
    }

    // Métricas del pool
    public PoolMetrics getMetrics() {
        return connectionPool.metrics();
    }

    // --- Conexión envuelta que intercepta close() ---
    private static class PooledConnection implements Connection, Wrapped<Connection> {

        private final Connection delegate;
        private final PooledRef<Connection> pooledRef;
        private final AtomicBoolean closed = new AtomicBoolean(false);

        PooledConnection(Connection delegate, PooledRef<Connection> pooledRef) {
            this.delegate = delegate;
            this.pooledRef = pooledRef;
        }

        // close() NO cierra la conexión real — la devuelve al pool
        @Override
        public Publisher<Void> close() {
            if (closed.compareAndSet(false, true)) {
                return pooledRef.release();  // ← devuelve al pool
            }
            return Mono.empty();
        }

        // El resto de métodos delegan a la conexión real
        @Override
        public Publisher<Void> beginTransaction() {
            return delegate.beginTransaction();
        }

        @Override
        public Publisher<Void> commitTransaction() {
            return delegate.commitTransaction();
        }

        @Override
        public Publisher<Void> rollbackTransaction() {
            return delegate.rollbackTransaction();
        }

        @Override
        public Batch createBatch() {
            return delegate.createBatch();
        }

        @Override
        public Statement createStatement(String sql) {
            return delegate.createStatement(sql);
        }

        @Override
        public Connection unwrap() {
            return delegate;
        }
    }
}

// implementacion:

@Bean
@NonNull
@Override
public ConnectionFactory connectionFactory() {
    // ... builder existente igual ...
    ConnectionFactory connectionFactory = ConnectionFactories.get(builder.build());

    ConnectionPoolConfiguration poolConfig = ConnectionPoolConfiguration.builder(connectionFactory)
            .initialSize(initialSize)
            .maxSize(maxSize)
            .maxIdleTime(maxIdleTime)
            .maxLifeTime(maxLifeTime)
            .maxCreateConnectionTime(maxCreateConnectionTime)
            .build();

    return new ConnectionPool(poolConfig);
}
