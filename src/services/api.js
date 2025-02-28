export async function fetchSavingsData() {
    const endpoint = "/api";

    try {
        const response = await fetch(endpoint, {
            headers: {
                "Authorization": `${import.meta.env.VITE_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API");
        }

        const data = await response.json();

        return {
            overview: {
                totalSavings: data.overview?.totalSavings || 0,
                currentMonthSavings: data.overview?.currentMonthSavings || 0,
                percentageChange: data.overview?.percentageChange || 0
            },
            savingsTrends: Array.isArray(data.savingsTrends) ? data.savingsTrends : [],
            savingsByCategory: Array.isArray(data.savingsByCategory) ? data.savingsByCategory : [],
            detailedSavings: Array.isArray(data.detailedSavings) ? data.detailedSavings : []
        };
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
}
