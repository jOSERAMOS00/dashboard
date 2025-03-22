def camarero_hamburguesas():
    menu = {
        "clasica": 14.000,
        "con queso": 15.000,
        "doble": 20.000,
        "vegetariana": 17.000,
        "pollo": 16.000,
        "especial": 25.000,
        "bbq": 18.000,
        "mexicana": 18.000
    }
    
    print("\n===== BIENVENIDO AL RESTAURANTE DE HAMBURGUESAS =====")
    print("\nNuestro menú:")
    
    for hamburguesa, precio in menu.items():
        print(f"Hamburguesa {hamburguesa}: ${precio:.2f}")
    
    print("\n¿Qué hamburguesa desea ordenar?")
    pedido = input("-> ").lower()
    
    if pedido in menu:
        precio = menu[pedido]
        print(f"\nHa seleccionado: Hamburguesa {pedido}")
        
        print("\n¿Desea agregar papas fritas por $5.000 adicionales? (sí/no)")
        papas = input("-> ").lower()
        
        print("\n¿Desea agregar una bebida por $3.000 adicionales? (sí/no)")
        bebida = input("-> ").lower()
        
        total = precio
        
        if papas.startswith("s"):
            total += 5.000
            print("+ Papas fritas: $5.000")
            
        if bebida.startswith("s"):
            total += 3.000
            print("+ Bebida: $3.000")
        
        print("\n===== RESUMEN DE SU PEDIDO =====")
        print(f"Hamburguesa {pedido}: ${precio:.2f}")
        print(f"Total a pagar: ${total:.2f}")
        print("\n¡Gracias por su pedido! Su orden estará lista en breve.")
    else:
        print(f"Lo siento, no tenemos hamburguesa '{pedido}' en nuestro menú.")
        print("Por favor, intente nuevamente con una opción válida.")

if __name__ == "__main__":
    camarero_hamburguesas()