CREATE PROCEDURE [dbo].[spTableCard_AddCard]
	@TableId UNIQUEIDENTIFIER,
	@CardId UNIQUEIDENTIFIER	
AS
BEGIN
	DECLARE @Position int

	
	SET @Position = (
		SELECT
			COUNT([TableCard].[TableId]) + 1 
		FROM
			[dbo].[TableCard]
		WHERE
			--[TableCard].[CardId] = @CardId and
			[TableCard].[TableId] = @TableId	
		)  

	INSERT INTO [dbo].[TableCard]
		(
			[CardId],
			[TableId],
			[Position]			
		)
	VALUES
		(
			@CardId,
			@TableId,
			@Position
		)
END

