CREATE PROCEDURE [dbo].[spTable_GetOnBoardById]
	@BoardId UNIQUEIDENTIFIER,
	@TableId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT
		[Table].[Id] as tableId,
		[Table].[Name]	
	FROM
		[BoardTable],
		[Table]
	WHERE
		[BoardTable].[BoardId] = @BoardId AND
		[BoardTable].[TableId] = [Table].[Id] AND
		[BoardTable].[TableId] = @TableId
	ORDER BY
		[BoardTable].[Position] ASC
END
