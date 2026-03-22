import { InferenceSession, Tensor } from "onnxruntime-web/webgpu";

export async function modelLoader(modelPath, backend) {
  const DEFAULT_INPUT_SIZE = [1, 3, 960, 960];

  // Fetch model as ArrayBuffer
  const response = await fetch(modelPath);
  if (!response.ok) {
    throw new Error(`Failed to fetch model: ${response.statusText}`);
  }
  const modelBuffer = await response.arrayBuffer();

  // load model
  const yolo_model = await InferenceSession.create(modelBuffer, {
    executionProviders: [backend],
  });

  // warm up
  const dummy_input_tensor = new Tensor(
    "float32",
    new Float32Array(DEFAULT_INPUT_SIZE.reduce((a, b) => a * b)),
    DEFAULT_INPUT_SIZE
  );
  const { output0 } = await yolo_model.run({ images: dummy_input_tensor });
  output0.dispose();
  dummy_input_tensor.dispose();

  return yolo_model;
}
