CREATE PROCEDURE [dbo].[spUser_Delete]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DELETE [GroupUser]
	WHERE [GroupUser].[UserId] = @Id

	DELETE [Group]
	WHERE [Group].[UserId] = @Id

	DELETE [Board]
	WHERE [Board].[UserId] = @Id

	DELETE [User]
	WHERE [User].[Id] = @Id
END
