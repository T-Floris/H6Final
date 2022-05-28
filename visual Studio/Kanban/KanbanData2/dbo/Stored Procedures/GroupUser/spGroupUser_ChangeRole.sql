CREATE PROCEDURE [dbo].[spGroupUser_ChangeRole]
	@GroupId UNIQUEIDENTIFIER,
	@UserId UNIQUEIDENTIFIER,
	@GroupAccessId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [GroupUser]
	SET [GroupAccessId] = @GroupAccessId
	WHERE [GroupUser].[GroupId] = @GroupId and [GroupUser].[UserId] = @UserId
END
