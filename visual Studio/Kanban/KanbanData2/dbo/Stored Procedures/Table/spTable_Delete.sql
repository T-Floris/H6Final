CREATE PROCEDURE [dbo].[spTable_Delete]
	@TableId UNIQUEIDENTIFIER,
	@BoardId UNIQUEIDENTIFIER
AS
BEGIN

	DECLARE @UpdatePosition int

	set @UpdatePosition = (
		SELECT 
			[BoardTable].[Position]
		FROM
			[dbo].[BoardTable]
		WHERE
			[BoardTable].[TableId] = @TableId AND
			[BoardTable].[BoardId] = @BoardId
	)

	UPDATE
		[TableCard]
	SET
		[Position] = [Position] - 1
	WHERE
		[TableCard].[Position] < @UpdatePosition



	DELETE
	FROM
		[Table]
	WHERE
		[Table].[Id] = @TableId
END
	