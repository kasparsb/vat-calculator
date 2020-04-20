<?php
// Read package version so we can include built js and css
$pkg = json_decode(file_get_contents('package.json'));
$version = $pkg->version;
?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
    <title>PVN kalkulators</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="build/app.min-<?php echo $version ?>.css" type='text/css' media='all' />
</head>
<body>
    <div class="app">

        <div class="calc">
            
            <div class="calc__vat">
                <label>PVN likme</label>
                <div class="vat">
                    <div class="vat__value"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                    <div class="vat__item"></div>
                </div>
            </div>

            <div class="calc__subtotal">
                <form method="post">
                    <div class="field">
                        <label>Summa</label>
                        <input type="number" step="any" name="subtotal" placeholder="0" />
                    </div>
                    <input type="submit" value="Rēķināt" style="display:none" />
                </form>
            </div>

            <div class="calc__precision">
                3 cipari aiz komata
                <div class="toggle-switch">
                    <label>
                        <input type="checkbox" name="precision3" /> <span>3 cipari aiz komata</span>
                    </label>
                </div>
            </div>

            <div class="calc__results">
                
                <div class="result">
                    <h4 class="result__heading">PVN izrēķināts no summas</h4>
                    <dl>
                        <dt>Summa bez PVN</dt>
                        <dd class="remove-total-wov"></dd>

                        <dt>PVN, <b><span class="remove-vat-rate"></span>%</b></dt>
                        <dd class="remove-vat"></dd>

                        <dt class="results__equation">.</dt>
                        <dd class="results__equation remove-equation"></dd>
                    </dl>
                </div>

                <div class="result">
                    <h4 class="result__heading">PVN pierēķināts pie summas</h4>
                    <dl>
                        <dt>Summa ar PVN</dt>
                        <dd class="add-total"></dd>

                        <dt>PVN, <b><span class="add-vat-rate"></span>%</b></dt>
                        <dd class="add-vat"></dd>

                        <dt class="results__equation"></dt>
                        <dd class="results__equation add-equation"></dd>
                    </dl>
                </div>

                
            </div>
        </div>

    </div>
    <script src="build/app.min-<?php echo $version ?>.js"></script>
</body>
</html>