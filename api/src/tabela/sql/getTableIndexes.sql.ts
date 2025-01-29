const getTableIndexesSQL = `
    SELECT
        i.relname AS index_name,
        ix.indisunique AS is_unique,
        ix.indisprimary AS is_primary,
        array_agg(a.attname ORDER BY a.attnum) AS column_names,
        am.amname AS index_type,
        pgd.description AS index_comment
    FROM
        pg_class t
        JOIN pg_index ix ON t.oid = ix.indrelid
        JOIN pg_class i ON i.oid = ix.indexrelid
        JOIN pg_am am ON i.relam = am.oid
        JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(ix.indkey)
        LEFT JOIN pg_description pgd ON pgd.objoid = i.oid
    WHERE
        t.relkind = 'r'
        AND t.relnamespace = $1::regnamespace
        AND t.relname = $2
    GROUP BY
        i.relname,
        ix.indisunique,
        ix.indisprimary,
        am.amname,
        pgd.description
    ORDER BY
        i.relname;
`;

export default getTableIndexesSQL;
