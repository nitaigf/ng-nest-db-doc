const getTableCommentSQL = `
    SELECT
        pgd.description AS tableComment
    FROM
        pg_class cl
        JOIN pg_namespace nsp ON cl.relnamespace = nsp.oid
        LEFT JOIN pg_description pgd ON pgd.objoid = cl.oid AND pgd.objsubid = 0
    WHERE
        cl.relname = $2
        AND nsp.nspname = $1
        AND cl.relkind = 'r';
`;

export default getTableCommentSQL;
