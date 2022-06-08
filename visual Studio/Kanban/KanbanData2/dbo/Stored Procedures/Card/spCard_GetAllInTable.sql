CREATE PROCEDURE [dbo].[spCard_GetAllInTable]
	@BoardId UNIQUEIDENTIFIER,
	@TableId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		[Card].[Id],
		[Card].[Info]
	FROM
		[dbo].[TableCard],
		[dbo].[BoardTable],
		[dbo].[Card]
	WHERE
		[dbo].[BoardTable].[BoardId] = @BoardId AND
		[dbo].[BoardTable].[TableId] = @TableId AND
		[dbo].[TableCard].[TableId] = @TableId AND
		[dbo].[TableCard].[CardId] = [Card].[Id]

END