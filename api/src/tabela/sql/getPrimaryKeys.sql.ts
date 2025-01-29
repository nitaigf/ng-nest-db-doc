const getPrimaryKeysSQL = `
    SELECT
        tc.constraint_name,
        kcu.column_name,
        cols.data_type,
        pgd.description AS column_comment,
        kcu.ordinal_position
    FROM
        information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        JOIN information_schema.columns AS cols
            ON cols.table_schema = tc.table_schema
            AND cols.table_name = tc.table_name
            AND cols.column_name = kcu.column_name
        LEFT JOIN pg_catalog.pg_statio_all_tables AS st
            ON st.relname = tc.table_name
            AND st.schemaname = tc.table_schema
        LEFT JOIN pg_catalog.pg_description AS pgd
            ON pgd.objoid = st.relid
            AND pgd.objsubid = cols.ordinal_position
    WHERE
        tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_schema = $1
        AND tc.table_name = $2
    ORDER BY
        tc.constraint_name,
        kcu.ordinal_position;
`;

export default getPrimaryKeysSQL;
