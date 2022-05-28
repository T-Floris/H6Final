CREATE PROCEDURE [dbo].[spUser_UpdateEmail]
	@Id UNIQUEIDENTIFIER,
	@NewEmailAddress nvarchar(256)	
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [User]
	SET [EmailAddress] = @NewEmailAddress
	WHERE [User].[Id] = @Id
END
