
const formulario = document.querySelector("#formulario");

        const getData = async (moneda) => {
            try {
                const res = await fetch(`https://mindicador.cl/api/${moneda}`);
                const data = await res.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
                return null;
            }
        };

        formulario.addEventListener("submit", async (event) => {
            event.preventDefault();
            let monto = document.querySelector("#monto").value;
            let moneda = document.querySelector("#moneda").value;
            let result = await getData(moneda);

            if (result && result.serie && result.serie.length > 0) {
                let valores = result.serie.map(item => item.valor);
                let conversion = monto / valores[0];
                let montoRound = Math.round(conversion * 100) / 100;

                document.querySelector("#resultado").innerHTML = "Resultado: " + "$" + montoRound + " " + moneda.toUpperCase();
            } else {
                document.querySelector("#resultado").innerHTML = "Error obteniendo datos";
            }
        });

        async function renderMoneda() {
            let moneda = "dolar"; 
            const monedas = await getData(moneda);
            console.log(monedas);
        }

        renderMoneda();