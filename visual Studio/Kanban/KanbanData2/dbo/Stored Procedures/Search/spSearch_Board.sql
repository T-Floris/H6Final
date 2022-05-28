CREATE PROCEDURE [dbo].[spSearch_Board]
	@BoardName nvarchar(128)
AS 
BEGIN
	SELECT 
		[Board].[Id],
		[Board].[UserId],
		[Board].[Name],
		LEN([Board].[Name]) - LEN(@BoardName) as search_BoardName
	FROM
		[dbo].[Board]
	WHERE
		[Board].[Name] like '%' + @BoardName + '%'
	ORDER BY
		search_BoardName,
		[Board].[Id] asc
END
