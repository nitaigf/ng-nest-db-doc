const getUniqueKeysSQL = `
    SELECT
        tc.constraint_name,
        array_agg(kcu.column_name ORDER BY kcu.ordinal_position) AS column_names,
        pgd.description AS constraint_comment
    FROM
        information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        LEFT JOIN pg_catalog.pg_statio_all_tables AS st
            ON st.relname = tc.table_name
            AND st.schemaname = tc.table_schema
        LEFT JOIN pg_catalog.pg_description AS pgd
            ON pgd.objoid = st.relid
            AND pgd.objsubid = kcu.ordinal_position
    WHERE
        tc.constraint_type = 'UNIQUE'
        AND tc.table_schema = $1
        AND tc.table_name = $2
    GROUP BY
        tc.constraint_name,
        pgd.description
    ORDER BY
        tc.constraint_name;
`;

export default getUniqueKeysSQL;
