CREATE PROCEDURE [dbo].[spTable_Add]
	@BoardId UNIQUEIDENTIFIER,
	@Name NVARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TableId UNIQUEIDENTIFIER;

	DECLARE @GuidTable TABLE (
		ColGuid uniqueidentifier
	)


	INSERT INTO [dbo].[Table]	
		(
			[Table].[Id],
			[Table].[Name]
		)
	OUTPUT inserted.Id INTO @GuidTable
	VALUES
		(
			DEFAULT,
			@Name
		)

	SELECT @TableId = ColGuid FROM @GuidTable


	EXEC [dbo].[spBoardTable_AddTable] @BoardId, @TableId
END

