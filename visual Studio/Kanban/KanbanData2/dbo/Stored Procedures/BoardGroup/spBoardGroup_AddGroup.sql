CREATE PROCEDURE [dbo].[spBoardGroup_AddGroup]
	@BoardId UNIQUEIDENTIFIER,
	@GroupId UNIQUEIDENTIFIER,
	@BoardAccessId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[BoardGroup]
	(
		[BoardId],
		[GroupId],
		[BoardAccessId]
	)
	VALUES
	(
		@BoardId,
		@GroupId,
		@BoardAccessId
	)
END