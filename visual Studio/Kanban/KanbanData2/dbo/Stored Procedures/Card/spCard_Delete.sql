CREATE PROCEDURE [dbo].[spCard_Delete]
	@BoardId UNIQUEIDENTIFIER,
	@TableId UNIQUEIDENTIFIER,
	@CardId UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @UpdatePosition int

	set @UpdatePosition = (
		SELECT 
			[TableCard].[Position]
		FROM
			[dbo].[TableCard]
		WHERE
			[TableCard].[TableId] = @TableId AND
			[TableCard].[CardId] = @CardId
	)

	UPDATE
		[TableCard]
	SET
		[Position] = [Position] - 1
	WHERE
		[TableCard].[Position] < @UpdatePosition

	DELETE 
		[TableCard]
	WHERE
		[TableCard].[CardId] = @CardId and
		[TableCard].[TableId] = @TableId

	DELETE [Card]
	WHERE [Card].[Id] = @CardId
	
END
