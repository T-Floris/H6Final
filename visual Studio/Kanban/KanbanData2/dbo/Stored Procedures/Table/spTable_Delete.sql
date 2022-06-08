CREATE PROCEDURE [dbo].[spTable_Delete]
	@TableId UNIQUEIDENTIFIER
AS
BEGIN
	DELETE
	FROM
		[Table]
	WHERE
		[Table].[Id] = @TableId
END
	