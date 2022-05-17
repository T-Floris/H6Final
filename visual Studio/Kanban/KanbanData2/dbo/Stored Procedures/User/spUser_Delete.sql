CREATE PROCEDURE [dbo].[spUser_Delete]
	@Id nvarchar(450)
AS
BEGIN
	SET NOCOUNT ON;

	DELETE [User]
	WHERE [User].[Id] = @Id
END
