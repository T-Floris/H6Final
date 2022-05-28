CREATE PROCEDURE [dbo].[spGroupUser_AddUser]
	@GroupId UNIQUEIDENTIFIER,
	@UserId UNIQUEIDENTIFIER,
	@GroupAccessId UNIQUEIDENTIFIER
AS
	--SET @GroupId = (SELECT [User].[Id]
	--FROM
	--	[dbo].[User]
	--WHERE
	--	[User].[Id] = @UserId
	--	)

	INSERT INTO [dbo].[GroupUser]
		(
			[GroupId],
			[UserId],
			[GroupAccessId]			
		)
	VALUES
		(
			@GroupId,
			@UserId,
			@GroupAccessId
		)
RETURN 
