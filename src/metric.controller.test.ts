import * as metric_controller from "./metric.controller"

// @ponicode
describe("get", () => {
    let inst: any

    beforeEach(() => {
        inst = new metric_controller.MetricController(undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.get()
        }
    
        expect(callFunction).not.toThrow()
    })
})
