CREATE PROCEDURE [dbo].[spUser_Delete]
	@UserId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DELETE [GroupUser]
	WHERE [GroupUser].[UserId] = @UserId

	DELETE [Group]
	WHERE [Group].[UserId] = @UserId

	DELETE [Board]
	WHERE [Board].[UserId] = @UserId

	DELETE [User]
	WHERE [User].[Id] = @UserId
END
