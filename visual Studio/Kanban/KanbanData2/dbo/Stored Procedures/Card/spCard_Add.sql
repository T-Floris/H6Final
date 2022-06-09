CREATE PROCEDURE [dbo].[spCard_Add]
	@BoardId UNIQUEIDENTIFIER,
	@TableId UNIQUEIDENTIFIER,
	@Info NVARCHAR(MAX)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @CardId UNIQUEIDENTIFIER;
	DECLARE @GuidTable TABLE (
		ColGuid uniqueidentifier
	)
	DECLARE @Position int;

	INSERT INTO [dbo].[Card]
		(
			[Id],
			[Info]
		)
	OUTPUT inserted.Id INTO @GuidTable
	VALUES
		(	
			DEFAULT,
			@Info
		)

	SELECT @CardId = ColGuid FROM @GuidTable
	
	--add to 'TableCard' table
	EXEC [dbo].[spTableCard_AddCard] @TableId, @CardId

	EXEC [dbo].[spCard_GetCardInTableById] @BoardId, @TableId, @CardId

END
