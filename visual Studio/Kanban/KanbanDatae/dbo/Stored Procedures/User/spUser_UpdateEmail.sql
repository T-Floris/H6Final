CREATE PROCEDURE [dbo].[spUser_UpdateEmail]
	@Id nvarchar(450),
	@NewEmailAddress nvarchar(256)	
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [User]
	SET [EmailAddress] = @NewEmailAddress
	WHERE [User].[Id] = @Id
END
