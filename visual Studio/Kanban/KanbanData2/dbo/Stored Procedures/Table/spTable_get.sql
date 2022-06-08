CREATE PROCEDURE [dbo].[spTable_Get]
	@BoardId UNIQUEIDENTIFIER
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
		[BoardTable].[TableId] = [Table].[Id]
	ORDER BY
		[BoardTable].[Position] ASC
END
