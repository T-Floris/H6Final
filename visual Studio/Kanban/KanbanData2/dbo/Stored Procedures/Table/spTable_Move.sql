CREATE PROCEDURE [dbo].[spTable_Move]
	@TableId UNIQUEIDENTIFIER,
	@BoardId UNIQUEIDENTIFIER,
	@NewPosition int
AS
BEGIN
	DECLARE @StartPosition int 
	
	set @StartPosition = (
		SELECT
			[BoardTable].[Position]
		FROM
			[dbo].[BoardTable]
		WHERE
			[BoardTable].[TableId] = @TableId AND
			[BoardTable].[BoardId] = @BoardId
	)


	UPDATE
		[BoardTable]
	SET
		[Position] = @NewPosition
	WHERE
		[BoardTable].[TableId] = @TableId


	UPDATE
		[BoardTable]
	SET
		[Position] = [BoardTable].[Position] + 1
	WHERE
		[BoardTable].[TableId] != @TableId AND
		[BoardTable].[Position] >= @NewPosition AND
		[BoardTable].[Position] <= @StartPosition AND
		[BoardTable].[BoardId] = @BoardId
END
