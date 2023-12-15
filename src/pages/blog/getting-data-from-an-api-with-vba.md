---
title: Getting Data from a 3rd Party API with VBA
description: GET and POST requests with VBA
publishDate: 2019-01-30
layout: ../../layouts/Post.astro
---

## Getting Data from a 3rd Party API with VBA

The other day I had to use VBA in order to retrive data from the [stockwatch.com](https://www.stockwatch.com) API. StockWatch offers [a fairly extensive stock API](https://www.stockwatch.com/Quote/Webquery.aspx) with a daily changing API key. StockWatch allows up to 100 stocks to be queried via a single query string in each call.

`getStockDataString()` takes: an array of strings which represent each stock symbol, the market or "region" where the symbols are located, and the daily API/authorization key (provided to you by StockWatch).

I wrote the subroutine (function) in Excel 2010 and the HTTP `GET` request uses the `MSXML2` library and the `XMLHTTP` method. I don't know if this library is available in later versions of Excel, but I'm sure the process for making HTTP requests would be similar.

The StockWatch API returns each stock on each line of the response and each requested field separated by a comma. For example a response may look like:

```
17.3,1462455,1738250300,19691231
1.66,26608794,5872261500,20180810
0.48,555772,22531200,20180913
```

So we will need to parse each line of the response and for each line, print each value (seperated by a comma) onto the current active sheet in Excel, starting at the top left.

```vb
Sub getStockDataString(stockSymbols() As Variant, region As String, authCode As String)

    ' Construct our string of stock symbols (that we will pass to the URL query string)
    Dim stockSymbolString As String
    Dim index As Integer
    index = 0
    Dim arrLength As Integer
    arrLength = UBound(stockSymbols) + 1
    For Each symbol In stockSymbols
        stockSymbolString = stockSymbolString & region & ":" & symbol
        If index + 1 < arrLength Then
            stockSymbolString = stockSymbolString & ","
        End If
        index = index + 1
    Next symbol

    ' Field values that we will loop over later
    Dim requestedFieldsStr As String
    ' The requested StockWatch fields. See the StockWatch documentation.
    requestedFieldsStr = "CVWx"

    ' Add each requested field to an array (`requestedFieldsArr`)
    Dim requestedFieldsArr() As String
    ReDim requestedFieldsArr(Len(requestedFieldsStr) - 1)
    For tmp = 1 To Len(requestedFieldsStr)
        requestedFieldsArr(tmp - 1) = Mid$(requestedFieldsStr, tmp, 1)
    Next

    ' Construct our URL
    Dim Url As String
    Url = "http://www.stockwatch.com/Quote/WebQuery.aspx?what=quote&format=comma&fields=" & requestedFieldsStr & "&header=N&symbols=" & stockSymbolString & "&region=" & region & "&auth=" & authCode

    ' Variables for our request
    Dim oXMLHTTP As Object
    Dim i As Long
    Dim vFF As Long
    Dim oResp() As Byte
    Dim bodyResponse As String
    Dim pos As Integer

    Set oXMLHTTP = CreateObject("MSXML2.XMLHTTP")
    ' Open socket to GET the URL
    oXMLHTTP.Open "GET", Url, False
    ' Send request
    oXMLHTTP.Send
    ' Check if server returned an OK code
    If oXMLHTTP.Status = 200 Then
        ' Wait for the response `readyState`. To be honest with you,
        ' I am uncertain why 4 is a magic number here.
        Do While oXMLHTTP.readyState <> 4
            DoEvents
        Loop

        ' The response will originally be returned as a byte array
        oResp = oXMLHTTP.responseBody

        ' Convert the returned byte array to a string
        bodyResponse = StrConv(oResp, vbUnicode)

        ' Check if our auth code is correct
        pos = InStr(bodyResponse, "Invalid auth parameter")
        If pos > 0 Then
          MsgBox "The auth code supplied is incorrect."
          Exit Sub
        End If

        ' Valid data. Let's parse it.
        Dim lines() As String
        ' `vbCrLf` represents a line feed in VBA
        lines = Split(bodyResponse, vbCrLf)
        ' Loop over each line in the returned string
        Dim lineIndex As Integer
        lineIndex = 1
        For Each l In lines

            ' TODO: Handle each line in the response
            'Debug.Print l

            ' Loop over each data point in the line
            Dim lineData() As String
            lineData = Split(l, ",")
            Dim dataPointIndex As Integer
            dataPointIndex = 0
            For Each dataPoint In lineData

                ' TODO: Handle each data point in a line
                'Debug.Print "Field " & requestedFieldsArr(dataPointIndex) & " Value: " & dataPoint

                ' Where the magic happens. Print the data to the current sheet.
                ActiveSheet.Cells(lineIndex, dataPointIndex + 1).Value = dataPoint

                ' Increment our pointer so that we know where to write the next datapoint on the sheet
                dataPointIndex = dataPointIndex + 1

            Next dataPoint

            ' Increment the row
            lineIndex = lineIndex + 1

        Next l

    Else
        ' TODO: Handle the case when the web server does not return an OK code
        MsgBox "Cannot get stock data from the web server. The server may be offline or unable to process this request."
        Exit Sub
    End If

    'Debug.Print "Request sent to: " & Url
    'Debug.Print bodyResponse

    ' Garbage collection
    Set oXMLHTTP = Nothing
End Sub

' Example of how to call `getStockDataString()`
Sub exampleCaller()
    ' Arrays in VBA should be declared as Variants first and then populated: https://stackoverflow.com/a/26492994/1171790
    ' Why this is so? I have not a clue..
    Dim stockSymbols() As Variant
    ' Make array <= 100 items long in production
    stockSymbols = Array("GOOGL", "AAPL", "BCE", "SYMC", "ADM")

    Dim region As String
    region = "U"

    Dim authCode As String
    authCode = "99969581,999155,999718,user123"

    ' Example call to getStockDataString()
    ' Pass an array of 100 symbols in production
    Call getStockDataString(stockSymbols, region, authCode)
End Sub
```

Hopefully someone out there finds this useful. To be honest, I was really surprised at the number of Microsoft libraries available in VBA. There are at least two fairly large ones for making HTTP requests. If you need any help with the code, feel free to reach out. I would also be interested knowing if the `MSXML2` library/object works in later versions of Excel.
