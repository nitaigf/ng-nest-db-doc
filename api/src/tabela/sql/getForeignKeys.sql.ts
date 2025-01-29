const getForeignKeysSQL = `
    SELECT
        con.conname AS constraint_name,
        array_agg(att.attname ORDER BY att.attnum) AS column_names,
        cl.relname AS foreign_table_name,
        array_agg(attf.attname ORDER BY attf.attnum) AS foreign_column_names,
        pgd.description AS constraint_comment
    FROM
        pg_constraint con
      JOIN pg_class cl ON con.confrelid = cl.oid
      JOIN pg_namespace nsp ON cl.relnamespace = nsp.oid
      JOIN pg_attribute att ON att.attrelid = con.conrelid AND att.attnum = ANY(con.conkey)
      JOIN pg_attribute attf ON attf.attrelid = con.confrelid AND attf.attnum = ANY(con.confkey)
      LEFT JOIN pg_description pgd ON pgd.objoid = con.oid
    WHERE
        con.contype = 'f'
        AND nsp.nspname = $1
        AND con.conrelid = $2::regclass
    GROUP BY
        con.conname,
        cl.relname,
        pgd.description
    ORDER BY
        con.conname;
`;

export default getForeignKeysSQL;
