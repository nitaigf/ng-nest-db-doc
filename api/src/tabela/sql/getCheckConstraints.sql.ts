const getCheckConstraintsSQL = `
    SELECT
      con.conname AS constraint_name,
      pg_get_constraintdef(con.oid) AS check_definition,
      pgd.description AS constraint_comment
    FROM
      pg_constraint con
      JOIN pg_class cl ON con.conrelid = cl.oid
      JOIN pg_namespace nsp ON cl.relnamespace = nsp.oid
      LEFT JOIN pg_description pgd ON pgd.objoid = con.oid
    WHERE
      con.contype = 'c'
      AND nsp.nspname = $1
      AND con.conrelid = $2::regclass
    ORDER BY
      con.conname;
`;

export default getCheckConstraintsSQL;
