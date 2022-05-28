CREATE PROCEDURE [dbo].[spBoardTable_MoveTable]
	@BoardId UNIQUEIDENTIFIER,
	@TableId UNIQUEIDENTIFIER,
	@Position Int 
AS
BEGIN
	DECLARE @value int

	
	SET @value = (
		SELECT
			MAX([Position])
		FROM
			[dbo].[BoardTable]
		WHERE
			[BoardTable].[BoardId] = @BoardId AND
			[BoardTable].[TableId] = @TableId AND
			[BoardTable].[Position] > @Position
		)  

		return @value



	


END

