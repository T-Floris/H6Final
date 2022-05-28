CREATE PROCEDURE [dbo].[spCard_Delete]
	@Id UNIQUEIDENTIFIER
AS
BEGIN
	SET NOCOUNT ON;

	DELETE [TableCard]
	WHERE [TableCard].[CardId] = @Id

	DELETE [Card]
	WHERE [Card].[Id] = @Id
	
END
