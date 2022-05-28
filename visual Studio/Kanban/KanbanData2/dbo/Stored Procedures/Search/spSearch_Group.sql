CREATE PROCEDURE [dbo].[spSearch_Group]
	@GroupName nvarchar(128)
AS 
BEGIN
	SELECT 
		[Group].[Id],
		[Group].[UserId],
		[Group].[Name],
		[Group].[Color],
		LEN([Group].[Name]) - LEN(@GroupName) as search_GroupName
	FROM
		[dbo].[Group]
	WHERE
		[Group].[Name] like '%' + @GroupName + '%'
	ORDER BY
		search_GroupName,
		[Group].[Id] asc
END
