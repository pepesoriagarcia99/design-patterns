/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

import { COLORS } from '../../helpers/colors.ts';

class Query {
  public table: string;
  public fields: string[] = [];
  public conditions: string[] = [];
  public orderByField?: string;
  public orderByDirection?: string;
  public limit?: number;

  constructor(table: string) {
    this.table = table;
  }

  private getFileds(): string {
    // ? Podria checar si la columna existe en la tabla.
     return this.fields.length > 0 ? this.fields.join(', ') : '*';
  }

  execute(): string {
    const wherePart = this.conditions.length > 0 ? `WHERE ${this.conditions.join(' AND ')}` : '';
    const orderByPart = this.orderByField ? `ORDER BY ${this.orderByField} ${this.orderByDirection}` : '';
    const limitPart = this.limit ? `LIMIT ${this.limit}` : '';

    return `SELECT ${this.getFileds()} FROM ${this.table} ${wherePart} ${orderByPart} ${limitPart};`;
  }
}

class QueryBuilder {
  private query: Query;

  constructor(table: string) {
    if(!table) {
      throw new Error('El nombre de la tabla es obligatorio');
    }

    this.query = new Query(table);
  }

  select(...fields: string[]): QueryBuilder {
    this.query.fields.push(...fields);
    return this;
  }

  where(condition: string): QueryBuilder {
    this.query.conditions.push(condition);
    return this;
  }

  orderBy(field: string, order: string): QueryBuilder {
    this.query.orderByField = field;
    this.query.orderByDirection = order;
    return this;
  }

  limit(limit: number): QueryBuilder {
    this.query.limit = limit;
    return this;
  }

  execute(): string {
    return this.query.execute();
  }  
}

function main() {
  const usersQuery = new QueryBuilder("users")
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

    console.log('Consulta: ', usersQuery);
}

main();

