CREATE PROCEDURE [dbo].[spUser_UpdateInfo]
	@id UNIQUEIDENTIFIER,
	@fristName nvarchar(256),	
	@lastName nvarchar(256)	
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [User]
	SET 
		[FirstName] = @fristName,
		[LastName] = @lastName
	WHERE [User].[Id] = @id
END
