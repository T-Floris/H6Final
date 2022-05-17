CREATE PROCEDURE [dbo].[spUser_UpdateUserName]
	@Id nvarchar(450),
	@UserName nvarchar(256)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [User]
	SET [UserName] = @UserName
	WHERE [User].[Id] = @Id
END

