CREATE PROCEDURE [dbo].[spUser_Select]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		[User].[Id], 
		[User].[FirstName], 
		[User].[LastName], 
		[User].[EmailAddress], 
		[User].[UserName],
		[User].[Avatar]
	FROM
		[dbo].[User]
	WHERE
		[User].[Id] = @Id
END
