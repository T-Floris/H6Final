CREATE PROCEDURE [dbo].[spUser_UpdateEmail]
	@UserId UNIQUEIDENTIFIER,
	@NewEmailAddress nvarchar(256)	
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [User]
	SET [EmailAddress] = @NewEmailAddress
	WHERE [User].[Id] = @UserId
END
