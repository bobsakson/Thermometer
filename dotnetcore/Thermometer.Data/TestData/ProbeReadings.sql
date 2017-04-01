--DELETE FROM ProbeReadings

DECLARE @startTime DATETIME, @endTime DATETIME, @currentTime DATETIME
DECLARE @diff INT, @probe1 DECIMAL(4,1), @probe2 DECIMAL(4,1)

SELECT @startTime = GETDATE()
SELECT @currentTime = @startTime
SELECT @endTime = DATEADD(hh, 14, @startTime)
SELECT @probe1 = 48
SELECT @probe2 = 235

WHILE @currentTime < @endTime
    BEGIN
        SELECT @diff = DATEDIFF(mi, @currentTime, @endTime)

        -- First hour
        IF @diff >= 780 
            BEGIN
                IF DATEDIFF(s, @startTime, @currentTime) % 60 = 0 AND DATEDIFF(mi, @startTime, @currentTime) <= 20
                    BEGIN
                        SELECT @probe2 += 2 --After 20 minutes, @probe2 is at 275
                    END

                IF DATEDIFF(s, @startTime, @currentTime) % 30 = 0
                    BEGIN
                        SELECT @probe1 += .45 --After 60 minutes, @probe 1 is at 102
                    END
            END

        IF @diff < 780 AND @diff >= 520
            BEGIN
                IF DATEDIFF(s, @startTime, @currentTime) % 60 = 0
                    BEGIN
                        SELECT @probe1 += .26 --After 5 hours, @probe 1 is at 165
                    END
            END

        IF @diff < 520 AND @diff >= 220
            BEGIN
                IF DATEDIFF(s, @startTime, @currentTime) % 60 = 0
                    BEGIN
                        SELECT @probe1 += .06 --After 10 hours, @probe 1 is at 185
                    END
            END

        IF @diff < 220
            BEGIN
                IF DATEDIFF(s, @startTime, @currentTime) % 60 = 0
                    BEGIN
                        SELECT @probe1 += .07 --After 14 hours, @probe 1 is at 203
                    END
            END
        
        INSERT INTO ProbeReadings
        (Temperature, ReadingTime, ProbeId, SessionId)
        VALUES
        (@probe1, @currentTime, 1, 1),
        (@probe2, @currentTime, 2, 1)

        SELECT @currentTime = DATEADD(s, 1, @currentTime)
    END