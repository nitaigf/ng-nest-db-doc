const getTableStructureSQL = `
    SELECT
        cols.column_name,
        cols.data_type,
        pgd.description AS column_comment
    FROM
        information_schema.columns AS cols
    LEFT JOIN
        pg_catalog.pg_statio_all_tables AS st
        ON st.relname = cols.table_name
    LEFT JOIN
        pg_catalog.pg_description AS pgd
        ON pgd.objoid = st.relid
        AND pgd.objsubid = cols.ordinal_position
    WHERE
        cols.table_schema = $1
        AND cols.table_name = $2
    ORDER BY
        cols.ordinal_position;
`;

export default getTableStructureSQL;
