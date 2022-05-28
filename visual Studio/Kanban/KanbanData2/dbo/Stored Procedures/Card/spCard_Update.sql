CREATE PROCEDURE [dbo].[spCard_Update]
	@Id UNIQUEIDENTIFIER,
	@Info nvarchar(max)	
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [dbo].[Card]
	SET [Info] = @Info
	WHERE [Card].[Id] = @Id
END
