CREATE PROCEDURE [dbo].[spCard_Delete]
	@BoardId UNIQUEIDENTIFIER,
	@TableId UNIQUEIDENTIFIER,
	@CardId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DELETE 
		[TableCard]
	WHERE
		[TableCard].[CardId] = @CardId and
		[TableCard].[TableId] = @TableId

	DELETE [Card]
	WHERE [Card].[Id] = @CardId
	
END
