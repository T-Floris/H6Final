CREATE PROCEDURE [dbo].[spGroupUser_RemoveUser]
	@UserId UNIQUEIDENTIFIER,
	@GroupId UNIQUEIDENTIFIER
AS
BEGIN
	DELETE 
		[GroupUser]
	WHERE 
		[GroupUser].[UserId] = @UserId and
		[GroupUser].[GroupId] = @GroupId
END
