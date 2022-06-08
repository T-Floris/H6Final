CREATE PROCEDURE [dbo].[spCard_GetCardInTableById]
	@BoardId UNIQUEIDENTIFIER,
	@TableId UNIQUEIDENTIFIER,
	@CardId UNIQUEIDENTIFIER
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
		[dbo].[TableCard].[TableId] = @TableId and
		[dbo].[TableCard].[CardId] = [Card].[Id] AND
		[dbo].[TableCard].[CardId] = @CardId

END