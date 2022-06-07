CREATE PROCEDURE [dbo].[spCard_Update]
	@CardId UNIQUEIDENTIFIER,
	@Info nvarchar(max)	
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [dbo].[Card]
	SET [Info] = @Info
	WHERE [Card].[Id] = @CardId
END
