CREATE PROCEDURE [dbo].[spSearch_User]
	@UserName nvarchar(128)
AS 
BEGIN
	SELECT 
		[User].[Id], 
		[User].[FirstName], 
		[User].[LastName], 
		[User].[EmailAddress], 
		[User].[UserName],
		[User].[Avatar],
		LEN([User].[UserName]) - LEN(@UserName) as search_UserName
	FROM
		[dbo].[User]
	WHERE
		[User].[UserName] like '%' + @UserName + '%'
	ORDER BY
		search_UserName,
		[User].[Id] asc

END
