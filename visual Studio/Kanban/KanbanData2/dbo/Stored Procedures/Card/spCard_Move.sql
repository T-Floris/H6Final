CREATE PROCEDURE [dbo].[spCard_Move]
	@BoardId UNIQUEIDENTIFIER,
	@CardId UNIQUEIDENTIFIER,
	@TableId UNIQUEIDENTIFIER,
	@NewPosition int,
	@NewTableId UNIQUEIDENTIFIER
AS
BEGIN
	DECLARE @StartPosition int 	
	DECLARE @Count int


	set @StartPosition = (
		SELECT
			[TableCard].[Position]
		FROM
			[dbo].[TableCard]
		WHERE
			[TableCard].[TableId] = @TableId AND
			[TableCard].[CardId] = @CardId
	)

	IF @NewTableId != @TableId
		BEGIN
			-- move card to new table
			UPDATE
				[TableCard]
			SET
				[TableCard].[TableId] = @NewTableId, [TableCard].[Position] = @NewPosition
			WHERE
				[TableCard].[CardId] = @CardId

			-- update Position of cards in NewTable
			UPDATE
				[TableCard]
			SET
				[TableCard].[Position] = [TableCard].[Position] + 1
			WHERE
				[TableCard].[CardId] != @CardId AND
				[TableCard].[Position] >= @NewPosition AND
				[TableCard].[TableId] = @NewTableId


			-- update Position of cards in oldTable
			UPDATE
				[TableCard]
			SET
				[Position] = [Position] - 1
			WHERE
				[TableCard].[Position] > @StartPosition AND
				[TableCard].[TableId] = @TableId

		END
	ELSE IF @NewTableId = @TableId
		BEGIN
			
			UPDATE
				[TableCard]
			SET
				[TableCArd].[Position] = @NewPosition
			WHERE
				[TableCard].[CardId] = @CardId 
				

			UPDATE
				[TableCard]
			SET
				[TableCard].[Position] = [TableCard].[Position] + 1
			WHERE
				[TableCard].[CardId] != @CardId AND
				[TableCard].[Position] >= @NewPosition AND
				[TableCard].[Position] <= @StartPosition AND
				[TableCard].[TableId] = @TableId

		END





	--Set @Count = (
	--	SELECT	
	--		COUNT([TableCard].[TableId])
	--	FROM
	--		[dbo].[TableCard]
	--	WHERE
	--		[TableCard].[TableId] = @TableId
	--)




	SELECT @CardId, @TableId
END
