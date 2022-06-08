CREATE PROCEDURE [dbo].[spBoardTable_AddTable]
	@BoardId UNIQUEIDENTIFIER,
	@TableId UNIQUEIDENTIFIER
AS
BEGIN
	DECLARE @Position int

	
	SET @Position = (
		SELECT
			COUNT([BoardTable].BoardId) + 1
		FROM
			[dbo].[BoardTable]
		WHERE
			[BoardTable].[BoardId] = @BoardId --AND
			--[BoardTable].[TableId] = @TableId
		)  

	

	INSERT INTO [dbo].[BoardTable]
	(
		[BoardId],
		[TableId],
		[Position]
	)
		VALUES
	(
		@BoardId,
		@TableId,
		@Position
	)
END
