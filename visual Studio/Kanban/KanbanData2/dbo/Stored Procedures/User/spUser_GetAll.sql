CREATE PROCEDURE [dbo].[spUser_GetAll]
AS 
BEGIN
	SELECT 
		[User].[Id], 
		[User].[FirstName], 
		[User].[LastName], 
		[User].[EmailAddress], 
		[User].[UserName],
		[User].[Avatar]
	FROM
		[dbo].[User]
	ORDER BY
		[User].[Id] asc

END
