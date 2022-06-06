CREATE PROCEDURE [dbo].[spBoard_Select]
	@UserId UNIQUEIDENTIFIER,
	@BoardId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		[Board].[Id],
		[User].[UserName],
		[Board].[Name]
	FROM
		[dbo].[Board], [dbo].[User]
	WHERE
		[Board].[Id] = @BoardId and
		[User].[Id] = [Board].[UserId] and
		[Board].[UserId] = @UserId
END
